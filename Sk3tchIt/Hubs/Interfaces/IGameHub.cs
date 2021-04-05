using System.Collections.Generic;
using System.Threading.Tasks;
using Sk3tchIt.Dtos;

namespace Sk3tchIt.Hubs.Interfaces
{
    public interface IGameHub
    {
        Task SendUsers(IList<GameUserDto> users);
    }
}