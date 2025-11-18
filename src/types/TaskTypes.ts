export default interface Task {
id:number
title:string
status:'pending' | 'in-progress' | 'completed'
priority:'low' | 'medium' | 'high'
createdAt:string}


