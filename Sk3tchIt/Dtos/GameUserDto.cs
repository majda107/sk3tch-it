using System.Collections.Generic;
using System.Linq;
using Sk3tchIt.Models;

namespace Sk3tchIt.Dtos
{
    public class GameUserDto
    {
        public string Uid { get; set; }
        public string Name { get; set; }
        public bool Ready { get; set; }
        public int Points { get; set; }


        // HELPER METHOD FOR DTO CONVERSION
        public static IList<GameUserDto> FromDict(Dictionary<string, GameUser> dict)
        {
            var users = dict.Keys.Select(k =>
            {
                var user = dict[k];
                return new GameUserDto {Uid = k, Name = user.Name, Ready = user.Ready, Points = user.Points};
            }).ToList();

            return users;
        }
    }
}