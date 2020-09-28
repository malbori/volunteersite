using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Value> Values {get; set; }

        public DbSet<Operation> Operations {get; set; }

        
        // Configure entities while migration is being created
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Allow migration to give appuser primary key
            base.OnModelCreating(builder);
            // Seeding data for intitial creation
            builder.Entity<Value>().HasData(
                new Value {Id =1, Name = "Value 1"},
                new Value {Id =2, Name = "Value 2"},
                new Value {Id =3, Name = "Value 3"}
            );
        }
    }
}
