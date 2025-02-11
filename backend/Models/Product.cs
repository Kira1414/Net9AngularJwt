using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Mark { get; set; }

    public decimal? Price { get; set; }
}
