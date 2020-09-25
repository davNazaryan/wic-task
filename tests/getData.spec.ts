import chai from "chai"
import getData from "../src/getData"

process.env.API = 'https://jsonplaceholder.typicode.com';

/* interface FilteredUsers {
    name: string,
    email: string,
}
interface UserTodos {
    name: string,
    todoCount: number,
}
interface GetDataRes {
    companies: Array<string>,
    filteredUsers: Array<number>,
    userTodos: Array<number>,
} */

describe('getData', function() {
    this.timeout(15000);

    it('without search str', async () => {
        let result = await getData();

        chai.expect(result).to.be.an('object');
        chai.expect(result.companies).to.be.an('array');
        chai.expect(result.filteredUsers).to.be.an('array');
        chai.expect(result.userTodos).to.be.an('array');
    });

    it('with search str', async () => {
        let result = await getData('R');
        chai.expect(result).to.be.an('object');

        chai.expect(result).to.be.an('object');
        chai.expect(result.companies).to.be.an('array');
        chai.expect(result.filteredUsers).to.be.an('array');
        chai.expect(result.userTodos).to.be.an('array');
    });
});
