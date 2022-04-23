import { checkConnection } from '~/api/apiGeneral'

export const actions = {
    async checkConnection({ commit }, payload) {
        const res = await checkConnection()
        return res
    }
}