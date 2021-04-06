using System.Collections.Generic;

namespace Sk3tchIt.Models
{
    public class RoomState
    {
        public string Word { get; set; } = "";
        public bool Running { get; set; }


        public void Start(string word)
        {
            this.Word = word;
            this.Running = true;
        }
    }
}