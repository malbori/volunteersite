using System;

namespace Domain
{
    public class UserOperation
    {
        public string AppUserId {get; set;}
        public virtual AppUser AppUser {get; set;}

        public Guid OperationId {get; set;}

        public virtual Operation Operation {get; set;}

        public DateTime DateJoined {get; set;}

        public bool IsHost {get; set;}
    }
}