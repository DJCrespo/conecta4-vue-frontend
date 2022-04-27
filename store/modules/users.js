import { createUser, getUsers } from '~/api/users'

export const actions = {
    async createUser({ commit }, payload) {
        const res = await createUser(payload.data)
        return res
    },
    async getUsers({ commit }, payload) {
        const res = await getUsers()
        return res
    }
}