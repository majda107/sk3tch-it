using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sk3tchIt.Hubs.Interfaces
{
    public interface IGameHub
    {
        Task SendUsers(Dictionary<string, string> users);
    }
}