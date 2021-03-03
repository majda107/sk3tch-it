using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Sk3tchIt.Hubs
{
    public class GameHub : Hub
    {
        public static Dictionary<string, string> Profiles { get; set; } = new Dictionary<string, string>();
        public static Random r = new Random();


        public async Task SetProfile(string username)
        {
            lock (Profiles)
            {
                if (!Profiles.ContainsKey(this.Context.ConnectionId))
                    Profiles.Add(this.Context.ConnectionId, username);
                else
                    Profiles[this.Context.ConnectionId] = username;
            }

            await this.Clients.All.SendAsync("users", Profiles);
        }

        public async Task Start()
        {
            var key = "";
            lock (Profiles)
            {
                var idx = r.Next(0, Profiles.Keys.Count);
                key = Profiles.Keys.ToArray()[idx];

                var profile = Profiles[key];
            }

            await this.Clients.Client(key).SendAsync("draw");
        }

        public Dictionary<string, string> GetUsers()
        {
            return Profiles;
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (Profiles.ContainsKey(this.Context.ConnectionId))
                Profiles.Remove(this.Context.ConnectionId);

            await this.Clients.All.SendAsync("users", Profiles);
            await base.OnDisconnectedAsync(exception);
        }
    }
}