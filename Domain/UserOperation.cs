using System;

namespace Domain
{
    public class UserOperation
    {
        public string AppUserId {get; set;}
        public AppUser AppUser {get; set;}

        public Guid OperationId {get; set;}

        public Operation Operation {get; set;}

        public DateTime DateJoined {get; set;}

        public bool IsHost {get; set;}
    }
}