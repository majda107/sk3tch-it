using System;
using System.Collections.Generic;
using System.Linq;
using System.Timers;
using Microsoft.EntityFrameworkCore.Design;
using Sk3tchIt.Extension;
using Sk3tchIt.Services;

namespace Sk3tchIt.Models
{
    public class GameRoom
    {
        private readonly WordService _ws;
        public readonly string Name;

        public Dictionary<string, GameUser> Users { get; set; } = new Dictionary<string, GameUser>();

        // public bool Running { get; set; }
        public RoomState State { get; set; }
        public string Drawing { get; set; }


        private System.Timers.Timer timer = new Timer(1000);
        private int left = 30;

        public event EventHandler<int> Tick;
        public event EventHandler Stopped;

        public GameRoom(string name, WordService ws)
        {
            this._ws = ws;

            this.Name = name;
            this.State = new RoomState();

            this.timer.AutoReset = true;
            this.timer.Elapsed += (o, e) =>
            {
                left -= 1;
                Tick?.Invoke(this, left);

                if (left <= 0) // TIMER HAS FINISHED
                    if (!TryProcessNextPlayer()) // NOONE CAN PLAY
                        this.TryStopRoom(); // STOP GAME
            };
        }


        // JOINS USER A ROOM
        // TODO RETREIVE TRUE / FALSE BASED ON PLAYING STATE
        public bool JoinUser(string uid, string name)
        {
            if (!this.Users.ContainsKey(uid))
                this.Users.Add(uid, new GameUser(name));

            return true;
        }


        // SETS USERS USERNAME
        // TODO EMIT TO ALL OTHER USERS
        public void SetUser(string uid, string name)
        {
            if (this.Users.ContainsKey(uid))
                this.Users[uid].Name = name;
        }


        // DISCONNECTS USER FROM A ROOM
        public void DisconnectUser(string uid)
        {
            if (this.Users.ContainsKey(uid))
                this.Users.Remove(uid);

            if (this.State.Running && this.Drawing == uid)
                this.TryStopRoom();
        }


        // SETS USER READY / PENDING
        public void SetUserReady(string uid, bool state)
        {
            if (this.Users.ContainsKey(uid))
                this.Users[uid].Ready = state;
        }


        // TRY TO START THE ROOM, RETURNS THE ONE WHO IS DRAWING
        public bool TryStartRoom(out string drawing)
        {
            drawing = null;

            if (!this.State.Running && this.Users.Count >= 2 && this.Users.Values.All(u => u.Ready))
            {
                // NOONE HAS PLAYED YET
                foreach (var user in this.Users.Values)
                    user.HasPlayed = false;

                this.TryProcessNextPlayer();
                this.timer.Start();

                drawing = this.Drawing;
                return true;
            }

            return false;
        }


        // TRIES TO PROCESS NEXT PLAYER
        private bool TryProcessNextPlayer()
        {
            // RESET USER GUESSES
            foreach (var user in this.Users.Values)
                user.HasGuessed = false;

            this.State.Start(this._ws.GetWord());

            var potentialPlayers = this.Users.Where(u => !u.Value.HasPlayed).ToList();
            if (potentialPlayers.Count <= 0) return false;

            this.Drawing = potentialPlayers.Random().Key;
            this.Users[this.Drawing].HasPlayed = true;

            this.left = 30; // SET LEFT TIME

            return true;
        }


        // TRY TO STOP THE ROOM
        public bool TryStopRoom()
        {
            if (this.State.Running)
            {
                Drawing = null;
                this.State.Running = false;

                this.timer.Stop();
                this.Stopped?.Invoke(this, EventArgs.Empty);

                return true;
            }

            return false;
        }


        // QUESS WORD
        public bool QuessWord(string uid, string word)
        {
            // CAN'T GUESS ROOM THAT'S NOT RUNNING
            if (!this.State.Running) return false;

            // DRAWER CANNOT GUESS THE WORD
            if (this.Drawing == uid) return false;

            if (word.ToLower() == this.State.Word.ToLower() && this.Users.ContainsKey(uid) &&
                !this.Users[uid].HasGuessed)
            {
                // ADD POINTS TO GUESSER
                this.Users[uid].Points += 3;

                // ADD POINTS TO ONE WHO IS DRAWING
                this.Users.FirstOrDefault(u => u.Key == this.Drawing).Value.Points += 1;

                this.Users[uid].HasGuessed = true;
                return true;
            }

            return false;
        }
    }
}