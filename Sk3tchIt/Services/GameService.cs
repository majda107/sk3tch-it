using System;
using System.Threading;
using Microsoft.AspNetCore.SignalR;
using Sk3tchIt.Hubs;

namespace Sk3tchIt.Services
{
    public class GameService
    {
        private Thread _timerThread;
        private readonly IHubContext<GameHub> _hub;

        public GameService(IHubContext<GameHub> hub)
        {
            this._timerThread = new Thread(Tick);
            this._hub = hub;
        }


        private void Tick()
        {
            while (true)
            {
                Console.WriteLine("GAME TICK!");
                this._hub.Clients.All.SendAsync("tick");

                Thread.Sleep(1000);
            }
        }

        public void StartGame()
        {
            this._timerThread.Start();
        }
    }
}