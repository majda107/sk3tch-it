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
        private System.Timers.Timer _timer;

        private readonly IHubContext<GameHub, IGameHub> _hub;
        // private readonly ILogger _logger;


        public Dictionary<string, GameRoom> Rooms { get; set; } = new Dictionary<string, GameRoom>();


        // public GameService(IHubContext<GameHub, IGameHub> hub, ILogger logger)
        public GameService(IHubContext<GameHub, IGameHub> hub)
        {
            this._timer = new Timer(1000);
            this._timer.Elapsed += (o, e) => Tick();
            this._timer.AutoReset = true;

            this._hub = hub;
            // this._logger = logger;
        }


        private void Tick()
        {
            Console.WriteLine("GAME TICK!");
            // this._hub.Clients.All.SendAsync("tick");
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
            if (room == null) return null;
            ;

            room.DisconnectUser(uid);
            return room;
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
                await this._hub.Clients.Clients(room.Users.Keys).Start(drawing);
        }


        // SENDS MESSAGE INTO A ROOM
        public async Task SendMessage(string uid, string message)
        {
            var room = this.Rooms.Values.FirstOrDefault(r => r.Users.Keys.Contains(uid));

            // SEND TO ALL USERS
            if (room != null)
                await this._hub.Clients.Clients(room.Users.Keys).SendMessage(uid, message);
        }
    }
}