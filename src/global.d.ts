declare module '*.css' {
  const content: string
  export default content
}

declare module '*.svg' {
  import React from 'react'
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default content
}

declare module '*.png' {
  import React from 'react'
  const content: string
  export default content
}

declare module '*.jpg' {
  import React from 'react'
  const content: string
  export default content
}

declare module '*.jpeg' {
  import React from 'react'
  const content: string
  export default content
}

declare module '*.gif' {
  import React from 'react'
  const content: string
  export default content
}