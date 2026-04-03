const Record = require('../models/Record')

const getSummary =async(req,res)=>{
  try{
    const userId =req.user.id

    const records = await Record.find({user: userId})

    let totalIncome= 0
    let totalExpense= 0

    records.forEach(r=>{
      if(r.type === 'income') totalIncome += r.amount
      else{
        totalExpense += r.amount
      }
    })

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome -totalExpense
    })
  } catch(err){
    res.status(500).json({message: 'Error getting summary'})
  }
}

const getCategoryData =async(req,res)=>{
  try{
    const userId= req.user.id

    const data= await Record.aggregate([
      {$match:{user: req.user._id}},
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ])

    res.json(data)
  } catch(err){
    res.status(500).json({message: 'Error fetching category data' })
  }
}

const getRecent =async(req,res)=>{
  try{
    const records =await Record.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5)

    res.json(records)
  } catch(err) {
    res.status(500).json({ message: 'Error fetching recent records' })
  }
}

const getMonthly = async(req,res)=>{
  try{
    const data = await Record.aggregate([
      { $match:{user:req.user._id } },
      {
        $group:{
          _id: { month:{$month: "$date" } },
          total: {$sum: "$amount"}
        }
      },
      {$sort: {"_id.month": 1 }}
    ])

    res.json(data)
  }catch(err){
    res.status(500).json({message: 'Something went wrong while fetching monthly data'})
  }
}

module.exports ={
  getSummary,
  getCategoryData,
  getRecent,
  getMonthly
}