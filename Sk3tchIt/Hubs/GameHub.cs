using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Sk3tchIt.Hubs
{
    public class GameHub : Hub
    {
        public static Dictionary<string, string> Profiles { get; set; } = new Dictionary<string, string>();


        public void SetProfile(string username)
        {
            if (!Profiles.ContainsKey(this.Context.ConnectionId))
                Profiles.Add(this.Context.ConnectionId, username);
            else
                Profiles[this.Context.ConnectionId] = username;
        }

        public Dictionary<string, string> GetUsers()
        {
            return Profiles;
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (Profiles.ContainsKey(this.Context.ConnectionId))
                Profiles.Remove(this.Context.ConnectionId);

            return base.OnDisconnectedAsync(exception);
        }
    }
}