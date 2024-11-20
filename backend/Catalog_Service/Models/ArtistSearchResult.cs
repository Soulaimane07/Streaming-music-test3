using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog_Service.Models
{
    public class ArtistSearchResult
    {
        public string ArtistName { get; set; }
        public string AlbumName { get; set; }
        public string SongName { get; set; }
        public string Genre { get; set; }
        public string ReleaseDate { get; set; }
        public string ImageUrl { get; set; }
    }
}