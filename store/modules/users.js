import { createUser } from '~/api/users'

export const actions = {
    async createUser({ commit }, payload) {
        const res = await createUser(payload.data)
        return res
    }
}