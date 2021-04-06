using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Sk3tchIt.Dtos;
using Sk3tchIt.Hubs;
using Sk3tchIt.Hubs.Interfaces;
using Sk3tchIt.Models;

namespace Sk3tchIt.Services
{
    public class GameService
    {
        private readonly IHubContext<GameHub, IGameHub> _hub;
        private readonly WordService _ws;

        public Dictionary<string, GameRoom> Rooms { get; set; } = new Dictionary<string, GameRoom>();


        // public GameService(IHubContext<GameHub, IGameHub> hub, ILogger logger)
        public GameService(IHubContext<GameHub, IGameHub> hub, WordService ws)
        {
            // this._logger = logger;

            this._hub = hub;
            this._ws = ws;
        }


        private void CreateRoom(string name)
        {
            var room = new GameRoom(name, this._ws);
            this.Rooms.Add(name, room);

            // HOOK THE ROOM FOR TICK EVENT
            room.Tick += async (o, left) => await this._hub.Clients.Clients(room.Users.Keys).Tick(left);

            // HOOK FOR ROOM STOP
            room.Stopped += async (o, e) => await this._hub.Clients.Clients(room.Users.Keys).Stop();

            // REFRESH ALL CLIENT ROOMS
            this._hub.Clients.All.SendRooms(this.Rooms.Keys.ToList());
        }

        private void RemoveRoom(GameRoom room)
        {
            if (this.Rooms.ContainsKey(room.Name))
                this.Rooms.Remove(room.Name);

            // REFRESH ALL CLIENT ROOMS
            this._hub.Clients.All.SendRooms(this.Rooms.Keys.ToList());
        }

        // JOINS USER A ROOM 
        public GameRoom JoinRoom(string roomName, string uid, string username)
        {
            // IF ROOM DOESN'T EXIST
            if (!this.Rooms.ContainsKey(roomName))
                return null;

            var room = this.Rooms[roomName];

            var status = room.JoinUser(uid, username);
            return room;
        }

        // CREATE ROOM
        public bool Create(string roomName)
        {
            if (!this.Rooms.ContainsKey(roomName))
            {
                this.CreateRoom(roomName);
                return true;
            }

            return false;
        }

        // DISCONNECTS USER FROM A ROOM
        public async Task DisconnectRoom(string uid)
        {
            var room = this.Rooms.Values.FirstOrDefault(r => r.Users.Keys.Contains(uid));
            if (room == null) return;

            room.DisconnectUser(uid);
            if (room.Users.Count <= 0) // REMOVE ROOM IF EMPTY
                this.RemoveRoom(room);

            // UPDATE ALL USERS
            await this._hub.Clients.Clients(room.Users.Keys).SendUsers(GameUserDto.FromDict(room.Users));
        }


        public async Task SetReady(string uid, bool state)
        {
            var room = this.Rooms.Values.FirstOrDefault(r => r.Users.Keys.Contains(uid));
            if (room == null) return;

            room.SetUserReady(uid, state);

            // UPDATE ALL USERS
            await this._hub.Clients.Clients(room.Users.Keys).SendUsers(GameUserDto.FromDict(room.Users));

            // START GAME IF ALL USERS ARE READY
            if (room.TryStartRoom(out string drawing))
            {
                await this._hub.Clients.Clients(room.Users.Keys).Start(drawing);
                await this._hub.Clients.Clients(drawing).Word(room.State.Word);
            }
        }


        // SENDS MESSAGE INTO A ROOM
        public async Task SendMessage(string uid, string message)
        {
            var room = this.Rooms.Values.FirstOrDefault(r => r.Users.Keys.Contains(uid));
            if (room == null) return;

            if (room.QuessWord(uid, message))
            {
                // IF EVERYONE HAS GUESSED
                if (room.Users.Where(u => u.Key != room.Drawing).All(u => u.Value.HasGuessed))
                    room.TryStopRoom();

                // UPDATE ALL USERS (because of points)
                await this._hub.Clients.Clients(room.Users.Keys).SendUsers(GameUserDto.FromDict(room.Users));

                await this._hub.Clients.Clients(room.Users.Keys)
                    .SendMessage("server", "{SOMEONE} has guessed the word");
            }
            else
            {
                // SEND TO ALL USERS
                await this._hub.Clients.Clients(room.Users.Keys).SendMessage(uid, message);
            }
        }


        // DRAW
        public async Task Draw(string uid, PencilStroke pencilStroke)
        {
            var room = this.Rooms.Values.FirstOrDefault(r => r.Drawing == uid);
            if (room == null) return;

            // SEND TO OTHER USERS (without the one who is drawing)
            await this._hub.Clients.Clients(room.Users.Keys.Except(new string[] {uid})).Draw(pencilStroke);
        }
    }
}