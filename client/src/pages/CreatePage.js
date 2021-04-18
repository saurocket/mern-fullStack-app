import {useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../contecst/AuthContext";
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp();
    const pressHandler = async (e) => {
        if(e.key === 'Enter'){
            try {
             const data =   await request('/api/link/generate', 'POST', {from: link}, {
                 Authorization: `Bearer ${auth.token}`
             })
                history.push(`/detail/${data.link._id}`)
            }catch (e) {
                
            }
        }
    }
    const [link, setLink] = useState('')
    return (
        <div className="row">
            <div className="col s8 offset-s2 create-wrapper">
                <div className="input-field">
                    <input
                        id="link"
                        type="text"
                        name="link"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">insert link</label>
                </div>
            </div>
        </div>
    )
}