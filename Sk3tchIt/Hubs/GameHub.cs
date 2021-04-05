using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Sk3tchIt.Dtos;
using Sk3tchIt.Hubs.Interfaces;
using Sk3tchIt.Models;
using Sk3tchIt.Services;

namespace Sk3tchIt.Hubs
{
    public class GameHub : Hub<IGameHub>
    {
        // public static Dictionary<string, string> Profiles { get; set; } = new Dictionary<string, string>();
        // public static Random r = new Random();


        private readonly GameService _gs;

        public GameHub(GameService gs)
        {
            this._gs = gs;
        }

        // ID ECHO
        public async Task<string> Id()
        {
            return this.Context.ConnectionId;
        }

        public async Task<bool> Join(string roomName, string username)
        {
            var uid = this.Context.ConnectionId;
            var room = this._gs.JoinCreateRoom(roomName, uid, username);

            // NOTIFY ALL USERS IN A ROOM
            await this.Clients.Clients(room.Users.Keys).SendUsers(GameUserDto.FromDict(room.Users));

            return room.State.Running;
        }

        public async Task Leave()
        {
            // TODO IMPLEMENT ROOM LEAVE
            throw new NotImplementedException();
        }


        // SETS READY / PENDING STATE
        public async Task Ready(bool state)
        {
            var uid = this.Context.ConnectionId;
            await this._gs.SetReady(uid, state);
        }


        // SEND MESSAGE
        public async Task Message(string message)
        {
            var uid = this.Context.ConnectionId;
            await this._gs.SendMessage(uid, message);
        }


        // DRAW
        public async Task Draw(PencilStroke pencilStroke)
        {
            var uid = this.Context.ConnectionId;
            await this._gs.Draw(uid, pencilStroke);
        }


        // CONNECTION DISCONNECTION BEHAVIOR
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var uid = this.Context.ConnectionId;

            var room = this._gs.DisconnectRoom(uid);
            if (room != null)
                await this.Clients.Clients(room.Users.Keys).SendUsers(GameUserDto.FromDict(room.Users));

            await base.OnDisconnectedAsync(exception);
        }


        // public async Task SetProfile(string username)
        // {
        //     lock (Profiles)
        //     {
        //         if (!Profiles.ContainsKey(this.Context.ConnectionId))
        //             Profiles.Add(this.Context.ConnectionId, username);
        //         else
        //             Profiles[this.Context.ConnectionId] = username;
        //     }
        //
        //     await this.Clients.All.SendAsync("users", Profiles);
        // }
        //
        // public async Task EchoDraw(int x, int y)
        // {
        //     await this.Clients.AllExcept(this.Context.ConnectionId).SendAsync("echoDraw", x, y);
        // }
        //
        // public async Task Start()
        // {
        //     var key = "";
        //     lock (Profiles)
        //     {
        //         var idx = r.Next(0, Profiles.Keys.Count);
        //         key = Profiles.Keys.ToArray()[idx];
        //
        //         var profile = Profiles[key];
        //     }
        //
        //     await this.Clients.Client(key).SendAsync("draw", "banana");
        //     await this.Clients.AllExcept(key).SendAsync("guess");
        //
        //     Console.WriteLine("Game started!");
        //     this._gs.StartGame();
        // }
        //
        // public async Task Guess(string word)
        // {
        //     var profile = Profiles[this.Context.ConnectionId];
        //     if (word == "banana")
        //     {
        //         await this.Clients.Caller.SendAsync("chat", "[*] Correct!");
        //         await this.Clients.Others.SendAsync("chat", $"[*]: {profile} IS CORRECT");
        //         return;
        //     }
        //
        //     await this.Clients.All.SendAsync("chat", $"[{profile}]: {word}");
        // }
        //
        // public Dictionary<string, string> GetUsers()
        // {
        //     return Profiles;
        // }
        //
        // public override async Task OnDisconnectedAsync(Exception? exception)
        // {
        //     if (Profiles.ContainsKey(this.Context.ConnectionId))
        //         Profiles.Remove(this.Context.ConnectionId);
        //
        //     await this.Clients.All.SendAsync("users", Profiles);
        //     await base.OnDisconnectedAsync(exception);
        // }
    }
}