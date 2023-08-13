import React, {useEffect, useState} from 'react';
import axios from 'axios';
const Test: React.FC = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/tests').then(res => {
            setName(res.data.name)
            setAge(res.data.age)
        }).catch(e => {
            console.log(e)
        })
    })
    return <div>
        name: {name}<br/>
        age: {age}
    </div>
}

export default Test;