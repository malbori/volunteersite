using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Operations.Any())
            {
                var activities = new List<Operation>
                {
                    new Operation
                    {
                        Title = "Past Operation 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Operation 2 months ago",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Operation
                    {
                        Title = "Past Operation 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Operation 1 month ago",
                        Category = "Culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                            new UserOperation
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Operation
                    {
                        Title = "Future Operation 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Operation 1 month in future",
                        Category = "Music",
                        City = "London",
                        Venue = "Wembly Stadium",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new UserOperation
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Operation
                    {
                        Title = "Future Operation 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Operation 2 months in future",
                        Category = "Food",
                        City = "London",
                        Venue = "Jamies Italian",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserOperation
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Operation
                    {
                        Title = "Future Operation 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Operation 3 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                            new UserOperation
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Operation
                    {
                        Title = "Future Operation 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Operation 4 months in future",
                        Category = "Culture",
                        City = "London",
                        Venue = "British Museum",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Operation
                    {
                        Title = "Future Operation 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Operation 5 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                            new UserOperation
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                        }
                    },
                    new Operation
                    {
                        Title = "Future Operation 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Operation 6 months in future",
                        Category = "Music",
                        City = "London",
                        Venue = "O2 Arena",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                            new UserOperation
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                        }
                    },
                    new Operation
                    {
                        Title = "Future Operation 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Operation 7 months in future",
                        Category = "Travel",
                        City = "Berlin",
                        Venue = "All",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                            new UserOperation
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                        }
                    },
                    new Operation
                    {
                        Title = "Future Operation 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Operation 8 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        UserOperations = new List<UserOperation>
                        {
                            new UserOperation
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserOperation
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    }
                };

                await context.Operations.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}