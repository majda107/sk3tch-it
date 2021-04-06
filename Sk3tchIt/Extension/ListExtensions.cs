using System;
using System.Collections.Generic;

namespace Sk3tchIt.Extension
{
    public static class ListExtensions
    {
        private static Random rand = new Random();

        public static T Random<T>(this List<T> list)
        {
            return list[rand.Next(0, list.Count)];
        }
    }
}