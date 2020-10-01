using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Operations
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Operation, OperationDto>();
            CreateMap<UserOperation, AttendeeDto>()
            .ForMember(m => m.UserName, op => op.MapFrom(s => s.AppUser.UserName))
            .ForMember(m => m.DisplayName, op => op.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(m => m.Image, op => op
                .MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(m => m.Following, op => op.MapFrom<FollowingResolver>());
        }
    }
}