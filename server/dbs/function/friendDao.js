const { User, sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');

const countMutualFriend = async ({ userId: id1, friendsIds }) => {
    let mutualFriends = {};
    await Promise.all(
        friendsIds.map(async (id2) => {
            try {
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
