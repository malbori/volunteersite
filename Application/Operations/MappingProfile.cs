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
            .ForMember(m => m.DisplayName, op => op.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}