import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../db/client";

const getSlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];
  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    return res.send(JSON.stringify({ message: "please use with a slug" }));
  }
  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    return res.send(JSON.stringify({ message: "slug not found" }));
  }

  return res.redirect(data.url);
};
export default getSlug;
