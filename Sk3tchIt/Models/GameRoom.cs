using System.Collections.Generic;

namespace Sk3tchIt.Models
{
    public class GameRoom
    {
        public Dictionary<string, GameUser> Users { get; set; } = new Dictionary<string, GameUser>();


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
    }
}