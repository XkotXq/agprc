export async function GET(req) {
    return Response.json({ praca: Math.random()*4})
}