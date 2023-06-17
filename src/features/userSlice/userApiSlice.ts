import { IAuthReqEditProfile, IUserContext } from "../../entity/UserAuth";
import { apiSlices } from "../../app/api/apiSlice";

export const userApiSlice = apiSlices.injectEndpoints({
    endpoints: builder => ({
        profile: builder.query<IUserContext, void>({
            query: () => ({
                url: '/users/me'
            }),
            providesTags: ['Profile']

        }),
        editProfile: builder.mutation<any, FormData>({
            query: (payload) => ({
                url: '/users/me',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Profile']
        })
    })
})

export const {
    useProfileQuery,
    useEditProfileMutation
} = userApiSlice