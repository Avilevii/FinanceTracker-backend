import { getLastweekHistory } from "../services/transactionsService.js";

export async function getDataOfPerviod(req, res){
    try{
        const id = Number( req.params.id);
        const {period} = req.query;
        console.log(id, period)
        if(period === 'week'){ 
            const dataOfWeek = await getLastweekHistory(id);
            res.status(200).json(dataOfWeek)
        }
        else if(period === 'month'){

        }
        else if(period === 'all'){

        }
        else{
            res.status(404).json({msg: `cannot name ${period}` })
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({msg: 'Error from server'});
    }
}