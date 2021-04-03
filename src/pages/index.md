---
title: Home
sections:
  - type: section_hero
    section_id: home
    title: '¡Hi, welcome to my web page!'
    subtitle: >-
        I'm software engineer, fullstack and android mobile developer and freelancer.
    actions:
    - type: action
      label: Contact
      url: /#contact
      style: button is-link is-large is-rounded
    - type: action
      label: Github
      url: https://github.com/rigobertocanseco
      style: button is-light is-large is-rounded is-outlined
      new_window: true
    - type: action
      label: Dev.to
      url: https://dev.to/rigomortis
      style: button is-light is-large is-rounded is-outlined
      new_window: true

  - type: section_about 
    title: 'About me'
    section_id: about
    subtitle: >-
        <p class="is-size-3">I am from Mexico, I studied computer engineering at <a href="https://en.wikipedia.org/wiki/National_Autonomous_University_of_Mexico">UNAM</a> and now I study pure mathematics.
         I have 5 years of experience as a <strong class="has-text-success">full-stack</strong>, <strong class="has-text-info">backend</strong> and <strong class="has-text-warning">mobile</strong> software engineer.
         </p>
         <p class="is-size-3">I love mathematics, philosophy, coding, cats, music, coffee & beer.</p>

  - type: section_portfolio
    section_id: portfolio
    title: Portfolio
    subtitle: Projects recents
    actions:
    - type: action
      label: View all
      url: https://github.com/rigobertocanseco?tab=repositories
      style: button is-primary is-large is-rounded
      new_window: true

  - type: section_posts
    title: Blog
    section_id: blog
    subtitle: Posts recents
    actions:
    - type: action
      label: View blog
      url: https://dev.to/rigomortis/
      style: button is-primary is-large is-rounded
      new_window: true

  - type: section_contact
    section_id: contact
    title: Contact
    subtitle: Follow me in Github or send an email
    content: >-
        <p class="is-size-1 has-text-white has-text-centered">Thank you for your interest in my work</p>
        <p class="is-size-3">Do you have a project in mind? If so, feel free to contact me.</p>
    actions:
    - type: action
      label: Github
      url: https://github.com/rigobertocanseco
      style: button is-light is-large is-rounded is-outlined
    - type: action
      label: Email
      url: mailto:rigobertocanseco@comunidad.unam.mx?subject=Contact&body=Hi!
      style: button is-light is-large is-rounded is-outlined

    form_id: contact
    form_action: /
    form_fields:
      - type: form_field
        input_type: email
        name: email
        label: Email
        default_value: Your email address
        is_required: true
      - type: form_field
        input_type: textarea
        name: message
        label: Message
        default_value: Your message
      - type: form_field
        input_type: recaptcha
    submit_label: Send
        
template: advanced
---
