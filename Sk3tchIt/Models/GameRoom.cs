using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Design;

namespace Sk3tchIt.Models
{
    public class GameRoom
    {
        public Dictionary<string, GameUser> Users { get; set; } = new Dictionary<string, GameUser>();

        public bool Running { get; set; }
        public string Drawing { get; set; }


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

            if (!this.Running && this.Users.Count > 2 && this.Users.Values.All(u => u.Ready))
            {
                this.Running = true;
                this.Drawing = this.Users.Keys.First();

                drawing = this.Drawing;
                return true;
            }

            return false;
        }
    }
}