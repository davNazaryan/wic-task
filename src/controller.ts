import axios from "axios";
import { Response, Request, NextFunction } from "express";

/**
 * @route GET /get_data/:searchStr?
 */
export default (req: Request, res: Response, next: NextFunction) => {
    const searchStr:String = req.params.searchStr;

    interface User {
        id: number,
        name: string,
        email: string,
        todoCount: number,
        completedTodoCount: number,
        company: string,
        posts: Array<object>,
        haveGeo: boolean,
    }

    Promise.all([
        axios.get(`${process.env.API}/users`),
        axios.get(`${process.env.API}/todos`),
        axios.get(`${process.env.API}/posts`),
        axios.get(`${process.env.API}/comments`)
    ]).then(([usersResponse, todosResponse, postsResponse, commentsResponse]) => {
        const userMap = {};
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
            userMap[todo.userId].todoCount++;
            if (todo.completed) userMap[todo.userId].completedTodoCount++;
        });

        const postMap = {};
        postsResponse.data.forEach((post) => {
            const postObject = {
                userId: post.userId,
                id: post.id,
                comments: 0,
            };
            postMap[post.id] = postObject;
            userMap[post.userId].posts.push(postObject);
        });
        commentsResponse.data.forEach((comment) => {
            postMap[comment.postId].comments++;
        });


        const userTodos = [];
        const companyMap = [];
        const filteredUsers = [];

        const companySet = new Set();
        Object.values(userMap).forEach((user: User) => {
            userTodos.push({
                name: user.name,
                todoCount: user.todoCount,
            });
            // @ts-ignore
            if (!searchStr || user.company.includes(searchStr)) {
                if (typeof companyMap[user.company] === 'undefined') companyMap[user.company] = 0;
                companyMap[user.company] += user.completedTodoCount;
                if (companyMap[user.company] > 3) companySet.add(user.company);
            }

            if (user.haveGeo && user.posts.length > 2) {
                // @ts-ignore
                const postsWithComments = user.posts.filter(post => post.comments > 3);
                if (postsWithComments.length > 2) filteredUsers.push({
                    name: user.name,
                    email: user.email,
                });
            }
        });

        res.json({
            companies: [...companySet],
            filteredUsers,
            userTodos,
        }).end();
    }).catch((e) => {
        console.log('!!!!!!!!!!!!!!!!!!!!');
        console.log(e);
        console.log('!!!!!!!!!!!!!!!!!!!!');
        res.status(204).end();
    });
    /*const user = req.user as UserDocument;
    const token = user.tokens.find((token: any) => token.kind === "facebook");
    graph.setAccessToken(token.accessToken);
    graph.get(`${user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
        if (err) { return next(err); }
        res.render("api/facebook", {
            title: "Facebook API",
            profile: results
        });
    });*/
};
