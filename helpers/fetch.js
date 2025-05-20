export async function useFetch(url) {
    try {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTZiMWY1NDQ3YzRiM2QxZmVlNGIzN2JmMzEyZjJmOSIsIm5iZiI6MTc0NDkwMjMwNy4wNDQ5OTk4LCJzdWIiOiI2ODAxMThhM2VmNWFlNjg3Y2JkOWVlZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XvwpEQzt6CgG4tJkgid7IoculijzdtpDzqBtk1bG2ks'
            }
          };

        const response = await fetch(url, options)

        const data = await response.json()

        return data.results
    } catch (error) {
        console.error('Fetch error handling:', error)
    }
}