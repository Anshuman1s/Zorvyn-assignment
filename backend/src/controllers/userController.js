const User = require('../models/User')

const getAllUsers =async(req,res)=>{
  try {
    const users =await User.find().select('-password')
    res.json(users)
  } catch (err){
    res.status(500).json({message:'Failed to fetch users'})
  }
}

const getUserById=async (req,res)=>{
  try {
    const user =await User.findById(req.params.id).select('-password')
    if (!user){
      return res.status(404).json({message: 'User not found'})
    }
    res.json(user)
  } catch (err){
    res.status(500).json({message: 'Error fetching user'})
  }
}

const updateUser=async(req,res)=>{
  try {
    const {name,role,status}=req.body

    const user=await User.findById(req.params.id)
    if (!user){
      return res.status(404).json({ message:'User not found'})
    }

    user.name =name || user.name
    user.role =role || user.role
    user.status=status || user.status

    const updatedUser=await user.save()

    res.json({
      message: 'User updated',
      user: updatedUser
    })
  } catch(err) {
    res.status(500).json({ message:'Update failed' })
  }
}

const deleteUser=async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    if (!user){
      return res.status(404).json({ message: 'User not found' })
    }

    await user.deleteOne()

    res.json({ message:'User deleted'})
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' })
  }
}

module.exports={
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}