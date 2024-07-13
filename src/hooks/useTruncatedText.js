function useTruncatedText(text, maxLength) {
  const truncate = () => {
    if (text.length <= maxLength) {
      return text
    }
    const trimmedText = text.substr(0, maxLength)
    const lastSpaceIndex = trimmedText.lastIndexOf(' ')

    if (lastSpaceIndex === -1) {
      return `${trimmedText}...`
    }

    return `${trimmedText.substr(0, lastSpaceIndex)}...`
  }

  return truncate(text, maxLength)
}

export default useTruncatedText
