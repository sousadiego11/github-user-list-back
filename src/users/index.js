import { getNextUsersListUrl, getUsersUrl } from "../utils/functions.js"
import { github } from "../utils/github.js"

export class Users {
	api = null

	constructor(api) {
		this.api = api
	}

	async getUsersList(since) {
		if (since && isNaN(since)) {
			throw new Error('Since must be a number!')
		}
	
		const url = getUsersUrl(since)
		const { data: users } = await github.get(url)
		const nextUrl = getNextUsersListUrl(users)
		
		return {
			users,
			nextUrl
		}
	}
	
	async getUser(username) {
		const { data: user } = await github.get(`/users/${username}`)
		return user
	}
	
	async getUserRepos(username) {
		const { data: repos } = await github.get(`/users/${username}/repos`)
		return repos
	}
}
