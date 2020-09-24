using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Value> Values {get; set; }

        public DbSet<Event> Events {get; set; }

        // Configure entities while migration is being created
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Seeding data for intitial creation
            builder.Entity<Value>().HasData(
                new Value {Id =1, Name = "Value 1"},
                new Value {Id =2, Name = "Value 2"},
                new Value {Id =3, Name = "Value 3"}
            );
        }
    }
}
