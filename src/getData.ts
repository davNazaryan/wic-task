import axios from "axios";
import { User, Post } from "./interfaces"

/**
 * @param [searchStr]
 */
export default (searchStr?: string) => {
    // Parallel fetch all necessary resources from API
    return Promise.all([
        axios.get(`${process.env.API}/users`),
        axios.get(`${process.env.API}/todos`),
        axios.get(`${process.env.API}/posts`),
        axios.get(`${process.env.API}/comments`)
    ]).then(([usersResponse, todosResponse, postsResponse, commentsResponse]) => {
        const userMap = {};
        // Generate users map using user.id as a key for easy access
        usersResponse.data.forEach((user) => {
            const haveGeo = !!(user.address && user.address.geo && user.address.geo.lat && user.address.geo.lng);
            userMap[user.id] = {
                id: user.id,
                name: user.name,
                email: user.email,
                todoCount: 0,
                completedTodoCount: 0,
                company: user.company.name,
                posts: [],
                haveGeo
            };
        });

        todosResponse.data.forEach((todo) => {
            // write(increment) in user object tasks and completed tasks
            userMap[todo.userId].todoCount++;
            if (todo.completed) userMap[todo.userId].completedTodoCount++;
        });

        const postMap = {};
        // Generate posts map using post.id key
        postsResponse.data.forEach((post) => {
            const postObject = {
                userId: post.userId,
                id: post.id,
                commentCount: 0,
            };
            // adding post object reference to the posts map
            postMap[post.id] = postObject;
            // add same reference inside corresponding user object
            userMap[post.userId].posts.push(postObject);
        });
        // calc each post comments count
        commentsResponse.data.forEach((comment) => {
            // this will update post object
            postMap[comment.postId].commentCount++;
        });

        const userTodos = [];
        const companyMap = [];
        const filteredUsers = [];

        // using set ot avoid duplication
        const companySet = new Set();

        // loop through users map to filter final results
        Object.values(userMap).forEach((user: User) => {
            // for every user, show how many "todo" items each user has
            userTodos.push({
                name: user.name,
                todoCount: user.todoCount,
            });

            // return the distinct company names (name only) of all users that have more than 3 distinct completed tasks.
            // only return company names that contain "searchStr" case-insensitive (from post parameter)
            if (!searchStr || user.company.includes(searchStr)) {
                // add company to the map, if company.name passed search part
                if (typeof companyMap[user.company] === 'undefined') companyMap[user.company] = 0;
                // increment company todos count via user complated todos count
                companyMap[user.company] += user.completedTodoCount;
                // check todos count right after
                if (companyMap[user.company] > 3) companySet.add(user.company);
            }

            // find all users names & emails that have more than 2 posts AND have geo locations (both "lat" and "lng" fields) filled
            if (user.haveGeo && user.posts.length > 2) {
                // AND for which each post have more than 3 comments
                const postsWithComments = user.posts.filter((post: Post) => post.commentCount > 3);
                if (postsWithComments.length > 2) filteredUsers.push({
                    name: user.name,
                    email: user.email,
                });
            }
        });

        return {
            companies: [...companySet],
            filteredUsers,
            userTodos,
        };
    });
};
