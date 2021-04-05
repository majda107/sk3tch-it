using System.Collections.Generic;
using System.Threading.Tasks;
using Sk3tchIt.Dtos;
using Sk3tchIt.Models;

namespace Sk3tchIt.Hubs.Interfaces
{
    public interface IGameHub
    {
        Task SendUsers(IList<GameUserDto> users);
        Task SendMessage(string uid, string message);

        Task Start(string drawing);
        Task Stop();

        Task Draw(PencilStroke pencilStroke);
        Task Tick(int left);
    }
}