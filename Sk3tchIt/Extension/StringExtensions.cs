using System.Collections.Generic;
using System.Text;

namespace Sk3tchIt.Extension
{
    public static class StringExtensions
    {
        private static Dictionary<char, char> _replaceDict = new Dictionary<char, char>();

        static StringExtensions()
        {
            var chars = "říšžťčýůňúěďáéó"; //příliš žluťoučký kůň úpěl ďábelské ódy
            var charsReplace = "risztcyunuedaeo";
            for (int i = 0; i < chars.Length; i++)
            {
                _replaceDict.Add(chars[i], charsReplace[i]);
            }
        }

        public static string RemoveDiacritics(this string text)
        {
            StringBuilder sb = new StringBuilder(text);
            for (int i = 0; i < sb.Length; i++)
            {
                if (_replaceDict.ContainsKey(sb[i]))
                {
                    sb[i] = _replaceDict[sb[i]];
                }
            }

            return sb.ToString();
        }
    }
}