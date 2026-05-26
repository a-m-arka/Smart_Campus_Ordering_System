import Lottie from "lottie-react"

const LottieIcon = ({ animation, size = 120 }) => {
  return (
    <Lottie
      animationData={animation}
      loop={true}
      style={{ width: size, height: size }}
    />
  )
}

export default LottieIcon