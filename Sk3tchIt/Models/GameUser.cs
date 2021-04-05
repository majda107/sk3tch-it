namespace Sk3tchIt.Models
{
    public class GameUser
    {
        public string Name { get; set; }
        public bool Ready { get; set; }


        public bool HasGuessed { get; set; }


        public GameUser(string name)
        {
            this.Name = name;
            this.Ready = false;
            this.HasGuessed = false;
        }
    }
}