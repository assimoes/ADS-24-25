import { Text, View, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
export default function CheckinScreen() {

  const { url } = useLocalSearchParams()
  const [data, setData] = useState<{ id: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [postLoading, setPostLoading] = useState(false)

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(url as string)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error(`error fetchind data from ${url}: `, error)
      Alert.alert('Error', `Failed to load data from ${url}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePostRequest = async (data: { id: string } | null) => {
    setPostLoading(true)
    try {
      const postUrl = `http://192.168.1.195:8080/attendance?student_id=1&classroom_id=1&class_id=${data?.id}`
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        Alert.alert('Success', 'Attendance confirmed!')
      } else {
        throw new Error('Failed to confirm attendance')
      }
    } catch (error) {
      console.error('error confirming attendance: ', error)
      Alert.alert('Error', 'Error confirming attendance')
    } finally {
      setPostLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color="#fff" />
      ) : (
        <>
          <Text style={styles.text}>Attendance details:</Text>
          <Text style={styles.text}>{JSON.stringify(data, null, 2)}</Text>

          <View style={styles.buttonContainer}>
            {postLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Button title="Confirm Check-in" onPress={() => handlePostRequest(data)} />
            )}
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
  },
});