export function GET() {
  return new Response(`# AviT Solutions

AviT Solutions is an AV + IT integration and custom software studio focused on audiovisual systems, control systems, IT networking, websites, mobile apps, automation, and operational software.

## Main Pages
- Homepage: https://www.avitsolutions.tech/
- AV Solutions: https://www.avitsolutions.tech/av-solutions
- IT Solutions: https://www.avitsolutions.tech/it-solutions
- Projects: https://www.avitsolutions.tech/projects
- About: https://www.avitsolutions.tech/about
- Contact: https://www.avitsolutions.tech/contact

## Core Capabilities
- Audiovisual integration
- Video conferencing
- Smart classrooms and lecture theatres
- Control systems and automation
- Digital signage
- IT and AV-over-IP networking
- Custom software, dashboards, websites, and mobile apps

## Important Note
Portfolio content describes AviT Solutions work, product builds, and founder experience. The website avoids implying direct client relationships with third-party brands unless explicitly approved.
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
