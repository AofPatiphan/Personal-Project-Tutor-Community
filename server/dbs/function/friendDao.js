const { User, sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');

const countMutualFriend = async ({ userId: id1, friendsIds }) => {
    let mutualFriends = {};
    await Promise.all(
        friendsIds.map(async (id2) => {
            try {
                // const friend1 = await Friend.findAll({
                //     where: {
                //         // [Op.and]: [{ id1: {[Op.in]:request_by_id} }, { id2: 6 }]

                //         [Op.and]: [
                //             {
                //                 [Op.or]: [
                //                     { request_by_id: id1 },
                //                     // { request_to_id: id1 },
                //                     // { request_by_id: id2 },
                //                     { request_to_id: id1 },
                //                 ],
                //             },
                //             { status: 'FRIEND' },
                //         ],
                //     },
                // });

                // const friend2 = await Friend.findAll({
                //     where: {
                //         // [Op.and]: [{ id1: {[Op.in]:request_by_id} }, { id2: 6 }]

                //         [Op.and]: [
                //             {
                //                 [Op.or]: [
                //                     { request_by_id: id2 },
                //                     // { request_to_id: id1 },
                //                     // { request_by_id: id2 },
                //                     { request_to_id: id2 },
                //                 ],
                //             },
                //             { status: 'FRIEND' },
                //         ],
                //     },
                // });
                // const idFriend1 = new Set();
                // friend1.forEach((element) => {
                //     if (id1 != element.request_by_id) {
                //         idFriend1.add(element.request_by_id);
                //     } else {
                //         idFriend1.add(element.request_to_id);
                //     }
                // });
                // let mutualfriend = [];
                // friend2.forEach((element) => {
                //     if (
                //         id2 != element.request_by_id &&
                //         idFriend1.has(element.request_by_id)
                //     ) {
                //         mutualfriend.push(element.request_by_id);
                //         return;
                //     }
                //     if (
                //         id2 != element.request_to_id &&
                //         idFriend1.has(element.request_to_id)
                //     ) {
                //         mutualfriend.push(element.request_t0_id);
                //         return;
                //     }
                // });
                const mutualfriend = await sequelize.query(
                    `select 
                    request_by_id,request_to_id,myId,otherFriendId,
                     case when  t1.request_by_id = ${id1} then t1.request_to_id
                      else t1.request_by_id
                     end as mutualFriend
                    from friends t1
                    inner join (select 
                     ${id1} as myId,
                     case when  request_by_id = ${id2} then request_to_id
                      else request_by_id
                     end as otherFriendId
                     from friends where ( (request_by_id = ${id2} and request_to_id != ${id1}) or (request_to_id =${id2} and request_by_id != ${id1} )) and status = 'FRIEND'
                        ) t2 on t2.myId = t1.request_by_id or t2.myId = t1.request_to_id
                    where t1.status = 'FRIEND'
                    and otherFriendId = t1.request_by_id or otherFriendId = request_to_id`,
                    { type: QueryTypes.SELECT }
                );
                const mutualFriendInfo = await User.findAll({
                    where: {
                        id: mutualfriend.map((el) => el.mutualFriend),
                    },
                });
                mutualFriends[id2] = mutualFriendInfo;
            } catch (err) {
                console.log(err);
            }
        })
    );

    return mutualFriends;
};

module.exports = { countMutualFriend };
