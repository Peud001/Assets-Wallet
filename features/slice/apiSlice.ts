import { addContact } from '@/lib/addContact';
import { getContacts } from '@/lib/fetchContacts';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['contacts'],
    endpoints: (build) => ({
        getContacts: build.query({
            async queryFn() {
                try {
                    const contacts = await getContacts();
                    return { data: contacts };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ['contacts']
        }),
        addContact: build.mutation({
            async queryFn(newContact) {
                try{
                    const contact = await addContact(newContact)
                    return {data : contact}
                }catch(error){
                    return error
                }
            }
        })
    }),
});

export const { useGetContactsQuery } = apiSlice;
