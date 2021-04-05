using System;
using System.Collections.Generic;
using System.Linq;
using System.Timers;
using Microsoft.AspNetCore.SignalR;
using Sk3tchIt.Hubs;
using Sk3tchIt.Models;

namespace Sk3tchIt.Services
{
    public class GameService
    {
        // private Thread _timerThread;
        private System.Timers.Timer _timer;
        private readonly IHubContext<GameHub> _hub;


        public Dictionary<string, GameRoom> Rooms { get; set; } = new Dictionary<string, GameRoom>();


        public GameService(IHubContext<GameHub> hub)
        {
            // this._timerThread = new Thread(Tick);
            this._timer = new Timer(1000);
            this._timer.Elapsed += (o, e) => Tick();
            this._timer.AutoReset = true;

            this._hub = hub;
        }


        private void Tick()
        {
            Console.WriteLine("GAME TICK!");
            this._hub.Clients.All.SendAsync("tick");
        }

        public void StartGame()
        {
            // this._timerThread.Start();
            this._timer.Start();
        }


        // JOINS USER A ROOM + CREATES ONE
        public GameRoom JoinRoom(string roomName, string uid, string username)
        {
            if (!this.Rooms.ContainsKey(roomName))
                this.Rooms.Add(roomName, new GameRoom());

            var room = this.Rooms[roomName];

            var status = room.JoinUser(uid, username);
            return room;
        }

        // DISCONNECTS USER FROM A ROOM
        // TODO ROOM HAS 0 USERS -> DELETE
        public GameRoom DisconnectRoom(string uid)
        {
            var room = this.Rooms.Values.FirstOrDefault(r => r.Users.Keys.Contains(uid));
            if (room == null) return room;

            room.DisconnectUser(uid);
            return room;
        }
    }
}