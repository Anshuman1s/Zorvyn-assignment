const Record = require('../models/Record')

const createRecord =async(req,res)=>{
  try {
    const {amount,type,category,date,note}= req.body
    const record = await Record.create({
      amount,
      type,
      category,
      date,
      note,
      user: req.user.id
    })

    res.status(201).json(record)
  } catch (err) {
    res.status(500).json({ message: 'Could not create record' })
  }
}

const getRecords = async(req,res)=>{
  try {
    const {type,category,startDate,endDate}= req.query

    let filter = { user: req.user.id }

    if (type) filter.type = type
    if (category) filter.category = category

    if (startDate || endDate) {
      filter.date = {}
      if (startDate) filter.date.$gte = new Date(startDate)
      if (endDate) filter.date.$lte = new Date(endDate)
    }

    const records = await Record.find(filter).sort({ date: -1 })

    res.json(records)
  } catch (err){
    res.status(500).json({ message: 'Error fetching records' })
  }
}

const updateRecord = async(req,res)=>{
  try {
    const record = await Record.findById(req.params.id)

    if (!record) {
      return res.status(404).json({ message:'Record not found' })
    }

    if (record.user.toString()!==req.user.id){
      return res.status(403).json({ message:'Not allowed'})
    }

    const { amount,type,category,date,note} =req.body

    record.amount = amount || record.amount
    record.type = type || record.type
    record.category = category || record.category
    record.date = date || record.date
    record.note = note || record.note

    const updated = await record.save()

    res.json(updated)
  } catch (err){
    res.status(500).json({message: 'Update failed'})
  }
}

const deleteRecord =async(req,res)=>{
  try {
    const record = await Record.findById(req.params.id)

    if (!record) {
      return res.status(404).json({message:'Record not found' })
    }

    if (record.user.toString() !== req.user.id){
      return res.status(403).json({ message: 'Not allowed' })
    }

    await record.deleteOne()

    res.json({message: 'Record deleted' })
  } catch (err) {
    res.status(500).json(
        {message: 'Delete failed',success:false,error:true

        })}
}

module.exports ={
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
}