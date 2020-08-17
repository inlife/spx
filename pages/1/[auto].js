import {useRouter} from 'next/router'

const auto = () => {
    const {query} = useRouter()
    const {auto: url} = query

    if (!url)
        return <div />

    console.log('[info] redirecting user to url:', url)
    window.location = url
    return null
}

export default auto
